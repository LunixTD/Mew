package com.rnvc.rnmodule;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.mew.R;

public class PlayListActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_play_list);
    }

    private View createView() {
        LinearLayout ll = findViewById(R.id.ll);
        return ll;
    }
}
