const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    onLoad () {
       cc.game.setFrameRate(60);
    }
}
