import { User } from "@/constants/type";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

/* API実装 */

// GitHubのユーザー情報を取得するAPI
export async function GET(request: ExpoRequest) {
  const queryParams = request.expoUrl.searchParams.get("name");
  const response = await fetch(`https://api.github.com/users/${queryParams}`);
  
  if (response.status < 200 || response.status > 299) {
    return ExpoResponse.json({
      status: 'failure',
      message: "Not Found",
    });
  }

  const responseBody = (await response.json()) as User;
  return ExpoResponse.json({ status: "success", res: responseBody });
}

