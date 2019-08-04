export default class Global {
  static getCanvas(): cc.Node {
    return cc.director.getScene().getChildByName("Canvas");
  }
}
