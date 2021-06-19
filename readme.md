Around the horn app!

Under contruction.

Guides:
https://www.twilio.com/blog/video-chat-react-hooks

https://www.twilio.com/docs/video/javascript-getting-started#1-get-the-programmable-video-javascript-sdk
https://www.twilio.com/console/video/project/testing-tools


import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;

public class Main {

	// Substitute your Twilio AccountSid and ApiKey details
	public static final String ACCOUNT_SID = "ACCOUNT_SID";
	public static final String API_KEY_SID = "API_KEY_SID";
	public static final String API_KEY_SECRET = "API_KEY_SECRET";

	public static void main(String[] args) throws Exception {
		// Create a VideoGrant
		final VideoGrant grant = new VideoGrant();
		grant.setRoom("cool room");

		// Create an Access Token
		final AccessToken token = new AccessToken.Builder(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET)
		.identity("example-user") // Set the Identity of this token
		.grant(grant) // Grant access to Video
		.build();

		// Serialize the token as a JWT
		final String jwt = token.toJWT();
		System.out.println(jwt);
	}
}