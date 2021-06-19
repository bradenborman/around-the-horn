package borman.aroundthehorn.services;


import borman.aroundthehorn.config.properties.TwilioConfigProperties;
import borman.aroundthehorn.models.TwilioTokenRequest;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TwiloTokenService {

    Logger logger = LoggerFactory.getLogger(TwiloTokenService.class);

    TwilioConfigProperties twilioConfigProperties;

    public TwiloTokenService(TwilioConfigProperties twilioConfigProperties) {
        this.twilioConfigProperties = twilioConfigProperties;
    }

    public String accessTokenForRoom(TwilioTokenRequest twilioTokenRequest) {

        // Create a VideoGrant
        final VideoGrant grant = new VideoGrant();
        grant.setRoom(twilioTokenRequest.getLobbyName());

        // Create an Access Token
        final AccessToken token = new AccessToken.Builder(
                twilioConfigProperties.getAccountSid(),
                twilioConfigProperties.getApi().getSid(),
                twilioConfigProperties.getApi().getSecret()
        )
                .identity(twilioTokenRequest.getUsername()) // Set the Identity of this token
                .grant(grant) // Grant access to Video
                .build();

        // Serialize the token as a JWT
        String tokenStr = token.toJwt();
        logger.info("Token: {}", tokenStr);

        return tokenStr;
    }


}