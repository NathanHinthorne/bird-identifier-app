package bird.identifier.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;
import android.view.View;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize the Splash Screen plugin
        registerPlugin(com.capacitorjs.plugins.splashscreen.SplashScreenPlugin.class);

    }
}
