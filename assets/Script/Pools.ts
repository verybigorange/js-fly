import ObjectPool from './utils/ObjectPool';
const { ccclass, property } = cc._decorator;

// 游戏中所有资源的对象池初始化
@ccclass
export default class Pools extends cc.Component {
    @property(cc.Prefab)
    myBullet:cc.Prefab = null

    // 我的子弹对象池
    static MyBulletPool = null

    onLoad(){
       this._init();
    }

    private _init(){
        Pools.MyBulletPool = new ObjectPool();
        Pools.MyBulletPool.init(this.myBullet);
    }

}


