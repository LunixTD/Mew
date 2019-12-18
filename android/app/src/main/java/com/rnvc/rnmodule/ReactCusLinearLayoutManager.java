package com.rnvc.rnmodule;

import android.content.Context;
import android.support.v4.view.NestedScrollingParent;
import android.support.v4.view.ViewCompat;
import android.support.v4.widget.NestedScrollView;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.OverScroller;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.facebook.react.uimanager.MeasureSpecAssertions;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.mew.R;

/**
 * Created by LinuxTD on 2019/1/8.
 */

public class ReactCusLinearLayoutManager extends ViewGroupManager<MyNestedScrollView> {
    public MyNestedScrollView myNestedScrollView;
    private static final String CUSLINEARLAYOUT_NANAGER_NAME = "RCTCusLinearLayout";
    @Override
    public String getName() {
        return CUSLINEARLAYOUT_NANAGER_NAME;
    }

    @Override
    protected MyNestedScrollView createViewInstance(ThemedReactContext reactContext) {
        myNestedScrollView = new MyNestedScrollView(reactContext);
        myNestedScrollView.setNestedScrollingEnabled(true);
        return myNestedScrollView;
    }
}

class MyNestedScrollView extends NestedScrollView {
    OverScroller mScroller;
    public MyNestedScrollView(Context context) {
        super(context);
        mScroller = new OverScroller(context);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        MeasureSpecAssertions.assertExplicitMeasureSpec(widthMeasureSpec, heightMeasureSpec);

        setMeasuredDimension(
                MeasureSpec.getSize(widthMeasureSpec),
                MeasureSpec.getSize(heightMeasureSpec));
    }

    @Override
    public boolean onStartNestedScroll(View child, View target, int nestedScrollAxes)
    {
        return (nestedScrollAxes & ViewCompat.SCROLL_AXIS_VERTICAL) != 0;
    }
    @Override
    public void onNestedPreScroll(View target, int dx, int dy, int[] consumed)
    {
        boolean hiddenTop = dy > 0 && getScrollY() < 400;
        boolean showTop = dy < 0 && getScrollY() < 400;

        if (hiddenTop || showTop)
        {
            scrollBy(0, dy);
            consumed[1] = dy;
        }
    }

    @Override
    public boolean onNestedFling(View target, float velocityX, float velocityY, boolean consumed) {
        return true;
    }

    @Override
    public boolean onNestedPreFling(View target, float velocityX, float velocityY) {
        if (getScrollY() >= 400) return true;
        fling((int) velocityY);
        return false;
    }

    public void fling(int velocityY) {
        mScroller.fling(0, getScrollY(), 0, velocityY, 0, 0, 0, 400);
        invalidate();
    }

}
