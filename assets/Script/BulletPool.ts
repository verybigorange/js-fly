const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletPool extends cc.Component {
  private _bulletPool = null;
  private _prefab = null;

  // LIFE-CYCLE CALLBACKS:

  static init(prefab: cc.Prefab) {
    this._prefab = prefab;
    this._bulletPool = new cc.NodePool();
  }

  static put(bullet: cc.Node) {
    this._bulletPool && this._bulletPool.put(bullet);
  }

  static get(): cc.Node {
    return this._bulletPool.size() > 0
      ? this._bulletPool.get()
      : cc.instantiate(this._prefab);
  }
}
