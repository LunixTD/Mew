package com.rnvc.rnmodule;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OpenNativeModule extends ReactContextBaseJavaModule{
    private ReactContext mContext;

    public OpenNativeModule(ReactApplicationContext context) {
        super(context);
        this.mContext = context;
    }

    @Override
    public String getName() {
        return "OpenNativeModule";
    }

    @ReactMethod
    public void getStringFromReactNative(String data) {
        Intent mIntent = new Intent("GET_RN_DATA");
//        mIntent.putExtra("listData", data);
        MyAlbumInfoData.setData(data);
        mContext.sendBroadcast(mIntent);
}

    @ReactMethod
    public void toast(String text, int duration) {
//        Log.w("343", text);
        Toast.makeText(mContext, text, duration).show();
    }
}

class MyAlbumInfoData {
    private static String mData;
    public static void setData(String data) {
        mData = data;
    }
    public static String getData() {
        return mData;
    }
}

