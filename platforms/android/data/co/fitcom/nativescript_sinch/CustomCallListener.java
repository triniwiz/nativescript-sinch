package co.fitcom.nativescript_sinch;
import com.sinch.android.rtc.PushPair;
import com.sinch.android.rtc.calling.Call;
import com.sinch.android.rtc.video.VideoCallListener;
import com.sinch.android.rtc.calling.CallListener;
import java.util.List;

public interface CustomCallListener extends CallListener, VideoCallListener {
        public void onCallEnded(Call call);
        public void onCallEstablished(Call call);
        public void onCallProgressing(Call call);
        public void onShouldSendPushNotification(Call call, List<PushPair> pushPairs);
        public void onVideoTrackAdded(Call call);
    }