import axios from 'axios';

const path = 'http://localhost:8080';

export const user = {
  username: 'test',
  password: '1234567Test',
};

export const POST = async (url: string, data: any) => {
	try {
		const res = await axios.post(path + url, data, { withCredentials: true });
		return res;
	}
	catch (err: any) {
		return err.response;
	}

};

export const DELETE = async (url: string) => {
  const res = await axios.delete(path + url, { withCredentials: true });
  return res;
};
