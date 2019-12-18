package com.rnvc.rnmodule;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.mew.R;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;


public class ReactCusListViewManager extends SimpleViewManager<ListView> {
    private ThemedReactContext mContext;
    private static final String CUSLISTVIEW_NANAGER_NAME = "RCTCusListView";
    private MyAdapter myAdapter = null;
    private ArrayList<BaseListItem> mData = new ArrayList<>();

    @Override
    public String getName() {
        return CUSLISTVIEW_NANAGER_NAME;
    }

    @Override
    protected ListView createViewInstance(ThemedReactContext reactContext) {
        this.mContext = reactContext;
        // 填充视图
        LayoutInflater inflater = LayoutInflater.from(mContext);
        // Adapter初始化
        ListView listView = (ListView) inflater.inflate(R.layout.layout_list, null);
        myAdapter = new MyAdapter<BaseListItem>(mData, R.layout.item) {
            @Override
            public void bindView(ViewHolder holder, BaseListItem obj) {
                holder.setText(R.id.index, String.valueOf(holder.getItemPosition() + 1));
                holder.setText(R.id.title, obj.title);
                holder.setText(R.id.etc, obj.etc);
            }
        };
        listView.setAdapter(myAdapter);
        return listView;
    }

    @ReactProp(name = "data")
    public void setmData(final ListView listView, String data) {
//        Log.w("接收到的数据", data);
        mData.clear();
        try {
            JSONArray jsonArray = new JSONArray(data);
            for (int i = 0; i < jsonArray.length(); i++ ) {
                BaseListItem item = BaseListItem.listItemData(jsonArray.getJSONObject(i));
                if (item != null) {
                    mData.add(item);
                } else {
                    Toast.makeText(mContext, "歌单内米有歌曲？！！重进试试...", Toast.LENGTH_LONG).show();
                }
            }
//            myAdapter.notifyDataSetChanged();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

}

abstract class MyAdapter<T> extends BaseAdapter {
    private int mLayoutRes;
    private ArrayList<T> mData;

    public MyAdapter() {}

    public MyAdapter(ArrayList<T> mData, int mLayoutRes) {
        this.mData = mData;
        this.mLayoutRes = mLayoutRes;
    }

    @Override
    public int getCount() {
        return mData.size();
    }

    @Override
    public T getItem(int position) {
        return mData.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder = ViewHolder.bind(parent.getContext(), convertView, parent, mLayoutRes, position);
        bindView(holder, getItem(position));
        return holder.getItemView();
    }

    public abstract void bindView(ViewHolder holder, T obj);

    public static class ViewHolder {
        private SparseArray<View> mViews;
        private View item;
        private int position;
        private Context context;

        private ViewHolder(Context context, ViewGroup parent, int layoutRes) {
            mViews = new SparseArray<>();
            this.context = context;
            View convertView = LayoutInflater.from(context).inflate(layoutRes, parent, false);
            convertView.setTag(this);
            item = convertView;
        }

        private static ViewHolder bind(Context context, View convertView, ViewGroup parent, int layoutRes, int position) {
            ViewHolder holder;
            if (convertView == null) {
                holder = new ViewHolder(context, parent, layoutRes);
            } else {
                holder = (ViewHolder) convertView.getTag();
                holder.item = convertView;
            }
            holder.position = position;
            return holder;
        }

        @SuppressWarnings("unchecked")
        public <T extends View> T getView(int id) {
            T t = (T) mViews.get(id);
            if(t == null) {
                t = (T) item.findViewById(id);
                mViews.put(id, t);
            }
            return t;
        }

        /**
         * 获取条目
         * */
        public View getItemView() {
            return item;
        }

        /**
         * 获取条目位置
         */
        public int getItemPosition() {
            return position;
        }

        /**
         * 设置文字
         * */
        public ViewHolder setText(int id, String text) {
            View view = getView(id);
            if (view instanceof TextView) {
                ((TextView) view).setText(text);
            }
            return this;
        }

        /**
         * 设置点击监听
         */
        public ViewHolder setOnClickListener(int id, View.OnClickListener listener) {
            getView(id).setOnClickListener(listener);
            return this;
        }
    }
}

// 数据类
class BaseListItem {
    protected Integer id;
    protected String title;
    protected String etc;

    public BaseListItem(
            Integer id,
            String title,
            String etc) {
        this.id = id;
        this.title = title;
        this.etc = etc;
    }

    public static BaseListItem listItemData(JSONObject json) {
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
            return new BaseListItem(
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