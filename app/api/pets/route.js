import { mysqlPool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(requst) {
  const promisePool = mysqlPool.promise();
  const [row, fields] = await promisePool.query(`SELECT * FROM pets`);
  return NextResponse.json(row);
}
