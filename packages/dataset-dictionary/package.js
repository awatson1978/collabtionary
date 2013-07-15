Package.describe({
  summary: "Meteorite package that provides a the Webster Unabridged English Dictionary."
});

Package.on_use(function (api) {
    api.add_files('initialize.dictionary.js', ["client","server"]);
});
