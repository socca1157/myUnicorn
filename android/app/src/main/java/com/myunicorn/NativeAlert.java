package com.myunicorn;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.AlertDialog;
import android.content.DialogInterface;

public class NativeAlert extends ReactContextBaseJavaModule  {

    public NativeAlert(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void openAlert(String title, String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle(title).setMessage(message).setPositiveButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                //do things
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @Override
    public String getName() {
        return "NativeAlert";
    }
}
