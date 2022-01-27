import { initRateLimit, CountFn } from "./rateLimit";
import { upstashRest } from "./upstash";

export default function getIP(request: Request) {
  const xff = request.headers.get("x-forwarded-for");
  return xff ? xff.split(",")[0] : "127.0.0.1";
}

export const ipRateLimit = initRateLimit((request) => ({
  id: `ip:${getIP(request)}`,
  count: increment,
  limit: 5,
  timeframe: 10,
}));

const increment: CountFn = async ({ key, timeframe }) => {
  const results = await upstashRest(
    [
      ["INCR", key],
      ["EXPIRE", key, timeframe],
    ],
    { pipeline: true }
  );
  return results[0].result;
};
