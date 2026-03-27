{ pkgs ? import (import ./npins).nixpkgs { } }:

let
  python = pkgs.python3.withPackages (ps: [ ps.rich ]);
in
pkgs.stdenv.mkDerivation {
  pname = "claude-fleet";
  version = "0.1.0";
  src = pkgs.lib.cleanSource ./.;

  nativeBuildInputs = [ pkgs.makeWrapper ];

  installPhase = ''
    mkdir -p $out/bin $out/share/claude-fleet

    # Copy templates and examples
    cp -r templates examples $out/share/claude-fleet/

    # Install scripts with runtime deps on PATH
    for script in bin/*; do
      install -Dm755 "$script" "$out/bin/$(basename "$script")"
    done

    # Wrap bash scripts with jq on PATH
    for script in $out/bin/fleet*; do
      name=$(basename "$script")
      if [[ "$name" == "fleet-dashboard" ]]; then
        wrapProgram "$script" \
          --set FLEET_DIR "$out/share/claude-fleet" \
          --prefix PATH : "${pkgs.lib.makeBinPath [ pkgs.jq python ]}"
      else
        wrapProgram "$script" \
          --set FLEET_DIR "$out/share/claude-fleet" \
          --prefix PATH : "${pkgs.lib.makeBinPath [ pkgs.jq ]}"
      fi
    done
  '';

  meta = {
    description = "Parallel task orchestrator for running hundreds of Claude Code sessions concurrently";
    license = pkgs.lib.licenses.mit;
    mainProgram = "fleet";
  };
}
