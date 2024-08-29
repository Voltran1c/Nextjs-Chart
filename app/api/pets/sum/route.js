import { mysqlPool } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(requst) {
  const promisePool = mysqlPool.promise();
  const [row, fields] = await promisePool.query(
    `SELECT animal, SUM(price) AS sumPrice FROM pets GROUP BY animal ORDER BY sumPrice DESC;`
  );
  return NextResponse.json(row);
}
