package com.rnvc.rnmodule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.scroll.ReactScrollViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

public class CusReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new OpenNativeModule(reactContext),
                new MyIntentModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new ReactRecycleViewManager(),
                new ReactCusListViewManager(),
                new ReactCusScrollViewManager(),
                new ReactCusViewGroupManager(),
                new ReactCusLinearLayoutManager()
        );
    }
}
