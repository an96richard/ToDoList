class Task {
    constructor(date, time, text, id, taskCompleted = false){
        this._date = date;
        this._time = time;
        this._text = text;
        this._taskCompleted = taskCompleted
        this._id = id
    }

    get taskId(){
        return this._id
    }
    set taskId(num){
        this._id = num
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
          id: this._id,
          date: this._date,
          time: this._time,
          text: this._text,
          taskCompleted: this._taskCompleted,
        };
      }
}

export {Task};