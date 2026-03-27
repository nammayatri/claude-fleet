{
  outputs = { self, ... }:
    let
      eachSystem = f:
        builtins.listToAttrs (map (system: {
          name = system;
          value = f (import (import ./npins).nixpkgs { inherit system; });
        }) [ "x86_64-linux" "aarch64-darwin" "aarch64-linux" "x86_64-darwin" ]);
    in
    {
      packages = eachSystem (pkgs: {
        default = import ./default.nix { inherit pkgs; };
      });
    };
}
