class Task {
    constructor(date, time, text, taskCompleted = false){
        this._date = date;
        this._time = time;
        this._text = text;
        this._taskCompleted = taskCompleted
    }


    get taskCompleted(){
        return this._taskCompleted
    }

    set taskCompleted(bool){
        this._taskCompleted = bool
    }

    get date(){
        return this._date
    }

    set date(newDate){
        this._date = newDate
    }
    
    get time(){
        return this._time
    }

    set time(newTime){
        this._time = newTime
    }

    get text() {
        return this._text
    }
    
    set text(newText) {
        this._text = newText
    }

    printTask(){
        return `You have to ${this._text} at ${this._time} on ${this._date}`
    }

    toPlainObject() {
        return {
          date: this.date,
          time: this.time,
          text: this.text,
          taskCompleted: this.taskCompleted,
        };
      }
}

export {Task};