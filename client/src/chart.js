class Chart {
  constructor(poolSize) {
    this.poolSize = poolSize;

    this.cpuLoad = new Array(poolSize).fill(0);

    this.deltaNew = 0;
    this.deltaOld = 0;

    this.pkgIdle = [];
    this.pkgSent = [];

    this.pkgIdleSum = 0;
    this.pkgSentSum = 0;

    this.pkgLineArray = [];

    this.pkgRatioIdle = 0;
    this.pkgRatioSent = 0;

    this.tick = 0;
  }

  addToPool(val, arr) {
    if (arr.length >= this.poolSize) {
      arr.shift();  
    }

    arr.push(val);

    return arr;
  }

  ticking() {
    this.tick = (this.tick < 100) ? this.tick += 1 : 0;
  }
}

export class Cpu extends Chart {
  getLine(cpuLoad = 0) {
    return super.addToPool(cpuLoad, this.cpuLoad);
  }

  getDelta() {
    let cpuLoadAverage = 0;

    if (this.tick % 10 === 0) {
      cpuLoadAverage = this.cpuLoad
        .slice(this.poolSize - 10)
        .reduce((acc, elm) => acc + elm, 0) / 10;

      this.deltaOld = this.deltaNew;
      this.deltaNew = Math.abs(cpuLoadAverage - this.deltaOld);
    }

    return {
      up: this.deltaOld <= this.deltaNew,
      value: Math.floor(this.deltaNew)
    }
  }
}

export class Pkg extends Chart {
  getLines(pkgIdle = 0, pkgSent = 0) {
    this.pkgIdle = super.addToPool(pkgIdle, this.pkgIdle);
    this.pkgSent = super.addToPool(pkgSent, this.pkgSent);
    
    if (this.tick % 20 === 0) {
      this.pkgIdleSum = this.pkgIdle.reduce((acc, elm) => acc + elm);
      this.pkgSentSum = this.pkgSent.reduce((acc, elm) => acc + elm);

      return super.addToPool({
        idle: this.pkgIdleSum,
        sent: this.pkgSentSum
      }, this.pkgLineArray);
    }

    return this.pkgLineArray || [{
        idle: this.pkgIdleSum,
        sent: this.pkgSentSum
    }];
  }

  getRatio() {
    if (this.tick % 20 === 0) {
      if (this.pkgIdleSum < this.pkgSentSum) {
        this.pkgRatioIdle = Math.round((this.pkgIdleSum / this.pkgSentSum) * 100);
        this.pkgRatioSent = Math.abs(this.pkgRatioIdle - 100);
      } else {
        this.pkgRatioSent = Math.round((this.pkgSentSum / this.pkgIdleSum) * 100);
        this.pkgRatioIdle = Math.abs(this.pkgRatioSent - 100);        
      }
    }

    return {
      idle: Math.floor(this.pkgRatioIdle),
      sent: Math.floor(this.pkgRatioSent)
    }
  }
}