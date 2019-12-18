package com.rnvc.rnmodule;

import android.content.Context;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.views.view.ReactViewGroup;

public class ReactCusViewGroupManager extends ViewGroupManager<ReactViewGroup> {
    private static final String CUSVIEWGROUP_NANAGER_NAME = "RCTCusViewGroup";
    @Override
    public String getName() {
        return CUSVIEWGROUP_NANAGER_NAME;
    }

    @Override
    protected ReactViewGroup createViewInstance(ThemedReactContext reactContext) {
        return new ReactCusViewGroupManager.CustomViewGroup(reactContext);
    }

    private class CustomViewGroup extends ReactViewGroup {
        public CustomViewGroup(Context context) {
            super(context);
        }
    }
}
