{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.sudo
    pkgs.findutils.locate
  ];
  idx.extensions = [
  ];
  services.postgres = {
    enable = true;
    package = pkgs.postgresql_15;
  };
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
