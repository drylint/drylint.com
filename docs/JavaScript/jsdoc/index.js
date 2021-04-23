/**
 * @constructor
 */
const Person = function () {
  /**
   * @constructor
   */
  this.Idea = function () {
    this.consider = function () {
      return 'hello'
    }
  }
}

const p = new Person()
const i = new p.Idea()
i.consider()
