'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import Loader from '@/components/Loader';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '@/service/tripService';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const libraries: 'places'[] = ['places'];

const averageLocation = (locs: TripLocation[]) => {
  if (locs.length === 0) return { lat: 0, lng: 0 };

  const total = locs.reduce(
    (acc, loc) => {
      acc.lat += loc.latitude;
      acc.lng += loc.longitude;
      return acc;
    },
    { lat: 0, lng: 0 }
  );
  return {
    lat: total.lat / locs.length,
    lng: total.lng / locs.length,
  };
};

const Map = ({
  tripId,
  locations,
}: {
  tripId: string;
  locations: TripLocation[];
}) => {
  const queryClient = useQueryClient();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [mapCenter, setMapCenter] = useState(averageLocation(locations));
  const [zoom, setZoom] = useState(12);
  const [selectedPlace, setSelectedPlace] = useState<{
    lat: number;
    lng: number;
    name?: string;
  } | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (newLocation: TripLocation) => {
      return tripService.updateTrip(tripId, {
        locations: [...locations, newLocation],
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip', tripId] });
    },
    onError: (error) => {
      console.error('Error adding traveller:', error);
    },
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      console.log(place);

      if (place.geometry?.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        };

        setSelectedPlace(location);
        setMapCenter({ lat: location.lat, lng: location.lng });
        setZoom(15);
      }
    }
  };

  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      // Try to get place name using reverse geocoding
      try {
        const geocoder = new google.maps.Geocoder();
        const response = await geocoder.geocode({ location: { lat, lng } });

        let placeName = 'Selected Location';
        if (response.results && response.results.length > 0) {
          // Try to get the most specific name
          const result = response.results[0];
          console.log('Geocoding result:', result);
          placeName = result.formatted_address || placeName;
        }

        setSelectedPlace({
          lat,
          lng,
          name: placeName,
        });
        setZoom(15);
      } catch (error) {
        console.error('Geocoding error:', error);
        setSelectedPlace({
          lat,
          lng,
          name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        });
        setZoom(15);
      }
    }
  };

  const onAddLocation = () => {
    if (selectedPlace) {
      const newLocation: TripLocation = {
        address: selectedPlace.name!,
        latitude: selectedPlace.lat,
        longitude: selectedPlace.lng,
      };

      mutate(newLocation);
      setSelectedPlace(null);
    }
  };

  if (!isLoaded) return <Loader />;

  return (
    <div className="h-full w-full flex flex-col gap-8 mt-10">
      <div className="w-full flex flex-row justify-center">
        <div className="flex flex-row gap-4 items-center">
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              fields: ['name', 'formatted_address', 'geometry', 'place_id'],
            }}
          >
            <Input
              type="text"
              placeholder="Destination"
              className="form__input"
            />
          </Autocomplete>
          <Button
            className="general-button"
            onClick={onAddLocation}
            disabled={!selectedPlace || isPending}
          >
            Add
          </Button>
        </div>
      </div>

      {(locations.length > 0 || selectedPlace) &&
        (isLoaded ? (
          <div className="h-100 xl:h-150 w-full rounded-lg">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={zoom}
              onClick={onMapClick}
            >
              {locations.map((location, index) => (
                <Marker
                  key={`location-${index}`}
                  position={{
                    lat: location.latitude,
                    lng: location.longitude,
                  }}
                />
              ))}

              {selectedPlace && (
                <Marker
                  position={{
                    lat: selectedPlace.lat,
                    lng: selectedPlace.lng,
                  }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  }}
                />
              )}
            </GoogleMap>
          </div>
        ) : (
          <Loader />
        ))}
    </div>
  );
};

export default Map;
