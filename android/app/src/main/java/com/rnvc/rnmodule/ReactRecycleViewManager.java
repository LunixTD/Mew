package com.rnvc.rnmodule;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.mew.R;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Resources;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.AppCompatTextView;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jp.wasabeef.glide.transformations.BlurTransformation;
import jp.wasabeef.glide.transformations.ColorFilterTransformation;
import jp.wasabeef.glide.transformations.gpu.BrightnessFilterTransformation;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class ReactRecycleViewManager extends SimpleViewManager<RecyclerView> {
    private ThemedReactContext mContext;
    private RecyclerView recycleView;
    private static final String RECYCLEVIEW_NANAGER_NAME = "RCTRecycleView";
    private static final String EVENT_NAME_ONSCROLL = "onScroll";
    private MyRecyclerAdapter mAdapter = null;
    private static List<Map<String, Object>> mData = new ArrayList<>();
    private View header;
    private RelativeLayout infoImg;
    private ImageView avatar;
    private TextView title;
    private TextView author;
    private LinearLayout authorBtn;
    private TextView commentCount;
    private TextView shareCount;
    private TextView subscribedCount;
    private MyReceiver receiver;

    @Override
    public String getName() {
        return RECYCLEVIEW_NANAGER_NAME;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(EVENT_NAME_ONSCROLL,MapBuilder.of("registrationName", EVENT_NAME_ONSCROLL));
    }

    @Override
    protected RecyclerView createViewInstance(ThemedReactContext reactContext) {
        this.mContext = reactContext;
        DisplayMetrics dm = mContext.getResources().getDisplayMetrics();
        int width = dm.widthPixels;
        int height = dm.heightPixels;

        LayoutInflater inflater = LayoutInflater.from(mContext);
        /*header内元素*/
        header = inflater.inflate(R.layout.layout_header, recycleView, false);
        infoImg = header.findViewById(R.id.header_center_l);
        avatar = header.findViewById(R.id.avatar);
        title = header.findViewById(R.id.header_center_l_title);
        author = header.findViewById(R.id.header_center_l_author);
        authorBtn = header.findViewById(R.id.authorBtn);
        commentCount = header.findViewById(R.id.commentCount);
        shareCount = header.findViewById(R.id.shareCount);
        subscribedCount = header.findViewById(R.id.subscribedCount);

        /*recyclerView*/
        recycleView = (RecyclerView) inflater.inflate(R.layout.layout_playlist, null);
        /*设置分隔线*/
        Drawable drawable = ContextCompat.getDrawable(mContext, R.drawable.recyclerview_divider);
        MyDividerItemDecoration itemDecoration = new MyDividerItemDecoration(mContext, MyDividerItemDecoration.VERTICAL);
        itemDecoration.setDrawable(drawable);
        recycleView.addItemDecoration(itemDecoration);

        /*设置布局和adapter*/
        LinearLayoutManager layoutManager = new LinearLayoutManager(mContext);
        recycleView.setLayoutManager(layoutManager);
        mAdapter = new MyRecyclerAdapter(mContext, mData);
        mAdapter.setOnItemClickListener(new CommonRecycleAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(View view) {
                int position = recycleView.getChildAdapterPosition(view);
                WritableMap params = Arguments.createMap();
                params.putString("itemIndex", String.valueOf(position - 1));
                sendEvent(mContext, "onItemClick", params);
            }

            @Override
            public void onItemLongClick(View view) {
                int position = recycleView.getChildAdapterPosition(view);
                WritableMap params = Arguments.createMap();
                params.putString("itemIndex", String.valueOf(position - 1));
                sendEvent(mContext, "onItemLongClick", params);
//                Toast.makeText(mContext, "onItemLongClick : " + position, Toast.LENGTH_SHORT).show();
            }
        });
        recycleView.setAdapter(mAdapter);
        recycleView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            int scrollY = 0;
            @Override
            public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
            }

            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
                scrollY += dy;
                WritableMap data = Arguments.createMap();
//                Log.w("sdfsd",String.valueOf(DensityUtil.px2dip(mContext, scrollY)));
                data.putInt("dy", DensityUtil.px2dip(mContext, scrollY));
                mContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        recycleView.getId(),
                        EVENT_NAME_ONSCROLL,
                        data
                );
            }
        });

        final int headerW = width;
        final int headerH = (height - DensityUtil.dip2px(mContext,50)) * 58 / 100;
        LinearLayout.LayoutParams headerParams = new LinearLayout.LayoutParams(headerW, headerH);
        header.setLayoutParams(headerParams);
        mAdapter.setHeaderView(header);

        int statusBarHeight = -1;
        int resourceId = mContext.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            statusBarHeight = mContext.getResources().getDimensionPixelOffset(resourceId);
        }
        int partNoListCtrH = headerH - DensityUtil.dip2px(mContext,46);
        final int btnContainerH = partNoListCtrH / 5;
        final int infoContainerH = partNoListCtrH - btnContainerH - statusBarHeight - DensityUtil.dip2px(mContext,50);


        /*btn控件容器*/
        LinearLayout btnContainer = header.findViewById(R.id.header_bottom_btn_layout);
        RelativeLayout.LayoutParams btnContainerParams = (RelativeLayout.LayoutParams) btnContainer.getLayoutParams();
        btnContainerParams.height = btnContainerH;
        btnContainer.setLayoutParams(btnContainerParams);

        /**
         * discinfo
         * */

        /*discinfo容器*/
        RelativeLayout infoContainer = header.findViewById(R.id.header_center);
        RelativeLayout.LayoutParams infoContainerParams = (RelativeLayout.LayoutParams) infoContainer.getLayoutParams();
        int pVal = DensityUtil.dip2px(mContext, 11);
        infoContainerParams.height = infoContainerH;
        infoContainer.setLayoutParams(infoContainerParams);
        infoContainer.setPadding(pVal * 2, pVal, pVal * 2, pVal);

        /*左侧专辑图片容器*/
        RelativeLayout infoImg = header.findViewById(R.id.header_center_l);
        RelativeLayout.LayoutParams infoImgParams = (RelativeLayout.LayoutParams) infoImg.getLayoutParams();
        infoImgParams.width = infoContainerH - pVal * 2;
        infoImgParams.height = infoContainerH - pVal * 2;
        infoImgParams.setMargins(0, 0, pVal * 3 / 2, 0);
        infoImg.setLayoutParams(infoImgParams);

        receiver = new MyReceiver();
        IntentFilter filter = new IntentFilter("GET_RN_DATA");
        mContext.registerReceiver(receiver, filter);

        return recycleView;
    }

    @Override
    public void onDropViewInstance(RecyclerView view) {
        mData.clear();
    }

    @ReactProp(name = "prevInfo")
    public void setPrevInfo(RecyclerView rcView, String data) {
        try {
            /*专辑背景*/
            JSONObject albumInfo = new JSONObject(data);
            String discImgUrl = albumInfo.getString("coverImgUrl") + "?param=300y300";
            Glide.with(mContext)
                    .load(discImgUrl)
                    .apply(RequestOptions.placeholderOf(R.mipmap.default_album_cover))
                    .apply(RequestOptions.bitmapTransform(new BlurTransformation(4, 40)).diskCacheStrategy(DiskCacheStrategy.ALL).skipMemoryCache(true))
                    .transition(new DrawableTransitionOptions().crossFade())
                    .into(new SimpleTarget<Drawable>() {
                        @Override
                        public void onResourceReady(Drawable resource, Transition<? super Drawable> transition) {
                            header.setBackground(resource);
                        }
                    });

            /*专辑封面*/
            Glide.with(mContext)
                    .load(discImgUrl)
                    .into(new SimpleTarget<Drawable>() {
                        @Override
                        public void onResourceReady(Drawable resource, Transition<? super Drawable> transition) {
                            infoImg.setBackground(resource);
                        }
                    });

            /*标题*/
            title.setText(albumInfo.getString("title"));

            /*avatar  用户昵称*/
            String authorName = albumInfo.getString("author");
            if (authorName != "null") {
                authorBtn.setClickable(true);
                author.setText(authorName);
                String avatarImgUrl = albumInfo.getString("avatar") + "?param=100y100";
                Glide.with(mContext)
                        .load(avatarImgUrl)
                        .apply(RequestOptions.circleCropTransform().diskCacheStrategy(DiskCacheStrategy.ALL).skipMemoryCache(true))
                        .into(avatar);
            } else {
                authorBtn.setClickable(false);
            }


        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private class MyReceiver extends BroadcastReceiver {
        private static final String action = "GET_RN_DATA";
        private String data;
        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getAction().equals(action)) {
                /*更新数据*/
                try {
                    data = MyAlbumInfoData.getData();
                    JSONObject jsonObject = new JSONObject(data);
                    if(!String.valueOf(jsonObject).contains("tracks")) {
                        return;
                    }

                    /*评论数目、分享数*/
                    commentCount.setText(jsonObject.getString("commentCount"));
                    shareCount.setText(jsonObject.getString("shareCount"));

                    /*歌曲列表*/
                    JSONArray jsonArray = jsonObject.getJSONArray("tracks");
                    for (int i = 0; i < jsonArray.length(); i++ ) {
                        Map<String, Object> map = new HashMap<>();
                        JSONObject trackObj = jsonArray.getJSONObject(i);
                        int trackId = trackObj.getInt("id");
                        String trackTitle = trackObj.getString("name");
                        String trackEtc = "";
                        JSONArray artArray = trackObj.getJSONArray("ar");
                        for (int j = 0; j < artArray.length(); j++) {
                            if (j < jsonArray.length() - 1) {
                                trackEtc = jsonArray.getJSONObject(i).getString("name") + "/";
                            } else {
                                trackEtc = jsonArray.getJSONObject(i).getString("name");
                            }
                        }
                        trackEtc = trackEtc + " - " + trackObj.getJSONObject("al").getString("name");
                        map.put("id", trackId);
                        map.put("id", trackId);
                        map.put("title", trackTitle);
                        map.put("etc", trackEtc);
                        mData.add(map);
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }
//                Log.w("广播", String .valueOf(mData));
                mAdapter.notifyDataSetChanged();
                recycleView.smoothScrollToPosition(0);
                mContext.unregisterReceiver(receiver);
            }
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}


/*字体图标*/
class IconView extends AppCompatTextView {
    public IconView(Context context) {
        super(context);
        init(context);
    }

    public IconView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public IconView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context);
    }

    private void init(Context context) {
        //设置字体图标
        Typeface font = Typeface.createFromAsset(context.getAssets(), "fonts/iconfont.ttf");
        this.setTypeface(font);
    }
}

class GeneralAdapter extends RecyclerView.Adapter<GeneralAdapter.MyViewHolder>{
    Context context;
    List<String> datas;
    public static final int TYPE_HEADER = 0;
    public static final int TYPE_NORMAL = 1;

    private View mHeaderView;

    public GeneralAdapter(Context context, List<String> datas) {
        this.context = context;
        this.datas = datas;
    }

    public int getRealPosition(MyViewHolder holder) {
        int position = holder.getLayoutPosition();
        return mHeaderView == null ? position : position - 1;
    }

    public void setHeaderView(View headerView) {
        mHeaderView = headerView;
        notifyItemInserted(0);
    }

    public View getHeaderView() {
        return mHeaderView;
    }

    @Override
    public int getItemViewType(int position) {
        if(mHeaderView == null) return TYPE_NORMAL;
        if(position == 0) return TYPE_HEADER;
        return TYPE_NORMAL;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //判断是否是头部
        if (mHeaderView != null && viewType == TYPE_HEADER)
            return new MyViewHolder(mHeaderView);
        //实例化得到Item布局文件的View对象
        View v = View.inflate(context, R.layout.item,null);
        //返回MyViewHolder的对象
        return new MyViewHolder(v);
    }

    //绑定数据
    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        if (getItemViewType(position) == TYPE_HEADER) return;

        if (holder instanceof MyViewHolder) {
            holder.indexView.setText(String.valueOf(position));
            holder.titleView.setText(datas.get(position));
            holder.etcView.setText(datas.get(position));
        }
    }

    //返回Item的数量
    @Override
    public int getItemCount() {
        return mHeaderView == null ? datas.size() : datas.size() + 1;
    }

    //继承RecyclerView.ViewHolder抽象类的自定义ViewHolder
    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView indexView;
        TextView titleView;
        TextView etcView;

        public MyViewHolder(View itemView) {
            super(itemView);
            indexView = itemView.findViewById(R.id.index);
            titleView = itemView.findViewById(R.id.title);
            etcView = itemView.findViewById(R.id.etc);
        }
    }
}

class MyRecyclerAdapter extends CommonRecycleAdapter {

    public MyRecyclerAdapter(ReactContext context, List<Map<String,Object>> dataList) {
        super(context, dataList, R.layout.item);
    }

    @Override
    void bindData(CommonViewHolder holder, Map<String, Object> map) {
        holder.setText(R.id.index, String.valueOf(holder.getLayoutPosition()))
                .setText(R.id.title, map.get("title").toString())
                .setText(R.id.etc, map.get("etc").toString());
    }

}

abstract class CommonRecycleAdapter extends RecyclerView.Adapter<CommonViewHolder> {
    ReactContext mContext;
    protected LayoutInflater layoutInflater;
    protected List<Map<String, Object>> dataList;
    protected int layoutId;
    private OnItemClickListener mItemClickListener;

    public static final int TYPE_HEADER = 0;
    public static final int TYPE_NORMAL = 1;

    private View mHeaderView;

    public CommonRecycleAdapter(ReactContext context, List<Map<String, Object>> dataList, int layoutId) {
        this.layoutInflater = LayoutInflater.from(context);
        this.dataList = dataList;
        this.layoutId = layoutId;
        this.mContext = context;
    }

    public int getRealPosition(CommonViewHolder holder) {
        int position = holder.getLayoutPosition();
        return mHeaderView == null ? position : position - 1;
    }

    public void setHeaderView(View headerView) {
        mHeaderView = headerView;
        notifyItemInserted(0);
    }

    public View getHeaderView() {
        return mHeaderView;
    }

    public static interface OnItemClickListener {
        void onItemClick(View view);
        void onItemLongClick(View view);
    }

    public void setOnItemClickListener(OnItemClickListener onItemClickListener) {
        this.mItemClickListener = onItemClickListener;
    }

    @Override
    public int getItemViewType(int position) {
        if(mHeaderView == null) return TYPE_NORMAL;
        if(position == 0) return TYPE_HEADER;
        return TYPE_NORMAL;
    }

    @NonNull
    @Override
    public CommonViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //判断是否是头部
        if (mHeaderView != null && viewType == TYPE_HEADER)
            return new CommonViewHolder(mHeaderView);
        //实例化得到Item布局文件的View对象
//        View v = View.inflate(context, R.layout.item,null);
        View v = layoutInflater.inflate(layoutId, parent, false);
        //返回MyViewHolder的对象
        return new CommonViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull CommonViewHolder holder, int position) {
        if (getItemViewType(position) == TYPE_HEADER) return;
        if (holder instanceof CommonViewHolder) {
            bindData(holder, dataList.get(position - 1));
            /* 绑定点击事件*/
            TextView iconView = ((CommonViewHolder) holder).itemView.findViewById(R.id.iconMore);
            final int index = position;
            iconView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    WritableMap params = Arguments.createMap();
                    params.putString("itemIndex", String.valueOf(index));
                    sendEvent(mContext, "onIconMoreClick", params);
                }
            });
            ((CommonViewHolder) holder).itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mItemClickListener.onItemClick(v);
                }
            });
            ((CommonViewHolder) holder).itemView.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(View v) {
                    mItemClickListener.onItemLongClick(v);
                    return true;
                }
            });
        }
    }

    @Override
    public int getItemCount() {
//        Log.w("数据长度", String.valueOf(dataList.size()));
        return mHeaderView == null ? dataList.size() : dataList.size() + 1;
    }

    abstract void bindData(CommonViewHolder holder, Map<String, Object> data);

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}

class CommonViewHolder extends RecyclerView.ViewHolder {

    private SparseArray<View> viewSparseArray;

    public CommonViewHolder(View itemView) {
        super(itemView);
        viewSparseArray = new SparseArray<>();
    }

    /**
     * 根据 ID 来获取 View
     *
     * @param viewId viewID
     * @param <T>    泛型
     * @return 将结果强转为 View 或 View 的子类型
     */
    public <T extends View> T getView(int viewId) {
        // 先从缓存中找，找到的话则直接返回
        // 如果找不到则 findViewById ，再把结果存入缓存中
        View view = viewSparseArray.get(viewId);
        if (view == null) {
            view = itemView.findViewById(viewId);
            viewSparseArray.put(viewId, view);
        }
        return (T) view;
    }

    public CommonViewHolder setText(int viewId, CharSequence text) {
        TextView tv = getView(viewId);
        tv.setText(text);
        return this;
    }

    public CommonViewHolder setViewVisibility(int viewId, int visibility) {
        getView(viewId).setVisibility(visibility);
        return this;
    }

    public CommonViewHolder setImageResource(int viewId, int resourceId) {
        ImageView imageView = getView(viewId);
        imageView.setImageResource(resourceId);
        return this;
    }

}

/*dp、px转换*/
class DensityUtil {
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }
    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }
}

/*分隔线*/
class MyItemDecoration extends RecyclerView.ItemDecoration {
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        outRect.set(0, 0, 0, 1);
    }
}

// 数据类
class BaseRecyclerViewItem {
    protected Integer id;
    protected String title;
    protected String etc;

    public BaseRecyclerViewItem(
            Integer id,
            String title,
            String etc) {
        this.id = id;
        this.title = title;
        this.etc = etc;
    }

    public static BaseRecyclerViewItem listItemData(JSONObject json) {
        try {
            JSONArray jsonArray = json.getJSONArray("ar");
            String etc = "";
            for (int i = 0; i < jsonArray.length(); i++) {
                if (i < jsonArray.length() - 1) {
                    etc = jsonArray.getJSONObject(i).getString("name") + "/";
                } else {
                    etc = jsonArray.getJSONObject(i).getString("name");
                }
            }
            etc = etc + " - " + json.getJSONObject("al").getString("name");
//            Log.w("etc内容", etc);
            return new BaseRecyclerViewItem(
                    json.getInt("id"),
                    json.getString("name"),
                    etc
            );
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}