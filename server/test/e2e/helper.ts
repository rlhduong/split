import dotenv from 'dotenv';
import axios from 'axios';
import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

dotenv.config();
const API = process.env.API!;

export interface RequestOptions {
  path: string;
  method: string;
  body?: Record<string, unknown>;
  token?: string;
  query?: Record<string, string>;
  cookies?: string[]; // cookies to send
}

export async function request({
  path,
  method,
  body = {},
  token,
  query = {},
  cookies = [],
}: RequestOptions) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (cookies && cookies.length > 0) {
    headers['Cookie'] = cookies.join('; ');
  }
  const options = {
    method,
    url: `${API}${path}`,
    headers,
    data: body,
    params: query,
    validateStatus: () => true,
  };

  const response = await axios(options);
  const setCookies = response.headers['set-cookie'] || [];
  return { ...response, setCookies };
}

// Base client
const client = new DynamoDBClient({
  endpoint: 'http://localhost:4566', // LocalStack endpoint
  region: 'ap-southeast-2',
});

const docClient = DynamoDBDocumentClient.from(client);
async function tableExists(tableName: string): Promise<boolean> {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (err: any) {
    if (err.name === 'ResourceNotFoundException') return false;
    throw err;
  }
}

export async function clearTable(tableName: string) {
  if (!(await tableExists(tableName))) {
    return;
  }

  const result = await docClient.send(
    new ScanCommand({ TableName: tableName })
  );
  if (!result.Items) return;

  for (const item of result.Items) {
    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { id: item.id },
      })
    );
  }
}

export async function clearAll() {
  await clearTable('User');
  await clearTable('Trip');
  await clearTable('Expense');
}
