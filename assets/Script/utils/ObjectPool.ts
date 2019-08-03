const { ccclass, property } = cc._decorator;

@ccclass
export default class ObjectPool extends cc.Component {
  private _targetPool = null;
  private _prefab = null;

  // LIFE-CYCLE CALLBACKS:

  public init(prefab: cc.Prefab) {
    this._prefab = prefab;
    this._targetPool = new cc.NodePool();
  }

  public put(bullet: cc.Node) {
    this._targetPool && this._targetPool.put(bullet);
  }

  public get(): cc.Node {
    return this._targetPool.size() > 0
      ? this._targetPool.get()
      : cc.instantiate(this._prefab);
  }
}
