export class TextBalloon {
  constructor(id, rect) {
    this.id = id;
    this.x = rect[0];
    this.y = rect[1];
    this.width = rect[2];
    this.height = rect[3];
  }
}
