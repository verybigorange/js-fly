import ObjectPool from './utils/ObjectPool';
const { ccclass, property } = cc._decorator;

// 游戏中所有资源的对象池初始化
@ccclass
export default class Pools extends cc.Component {
    @property(cc.Prefab)
    myBullet:cc.Prefab = null
    @property(cc.Prefab)
    enemy:cc.Prefab = null

    // 我的子弹对象池
    static MyBulletPool = null
   
    // 敌人对象池
    static EnemyPool = null

    onLoad(){
       this._init();
    }

    private _init(){
        Pools.MyBulletPool = new ObjectPool();
        Pools.MyBulletPool.init(this.myBullet);

        Pools.EnemyPool = new ObjectPool();
        Pools.EnemyPool.init(this.enemy);
    }

}