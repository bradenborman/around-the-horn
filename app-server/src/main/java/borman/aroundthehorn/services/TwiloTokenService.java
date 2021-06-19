package borman.aroundthehorn.services;


import borman.aroundthehorn.config.properties.TwilioConfigProperties;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;
import org.springframework.stereotype.Service;

@Service
public class TwiloTokenService {


    TwilioConfigProperties twilioConfigProperties;

    public TwiloTokenService(TwilioConfigProperties twilioConfigProperties) {
        this.twilioConfigProperties = twilioConfigProperties;
    }

    public String accessTokenForRoom(String usernameJoining) {

        // Create a VideoGrant
        final VideoGrant grant = new VideoGrant();
        grant.setRoom(twilioConfigProperties.getRoomName());

        // Create an Access Token
        final AccessToken token = new AccessToken.Builder(
                twilioConfigProperties.getAccountSid(),
                twilioConfigProperties.getApi().getSid(),
                twilioConfigProperties.getApi().getSecret()
        )
                .identity(usernameJoining) // Set the Identity of this token
                .grant(grant) // Grant access to Video
                .build();

        // Serialize the token as a JWT
        return token.toJwt();

    }


}