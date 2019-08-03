const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    onLoad () {
       cc.game.setFrameRate(60);
    }
}
