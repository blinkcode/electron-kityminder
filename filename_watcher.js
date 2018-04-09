class filename_watcher {
  constructor (fname) {
    this.filename = fname;
    if (!Object.is(this.filename, undefined)) {
      let fname_l = this.filename.split(/[\\/]/);
      document.title = fname_l[fname_l.length-1];
    }
    else {
     document.title = 'Untitled.km';
    }
  }

  setFilename (fname) {
    if (this.filename != fname) {
      this.filename = fname;
      let fname_l = this.filename.split(/[\\/]/);
      document.title = fname_l[fname_l.length-1];
    }
  }

  getFilename (fname) {
    return this.filename;
  }
}

module.exports = filename_watcher;
