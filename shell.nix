let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-23.11";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in

pkgs.mkShellNoCC {
  packages = with pkgs; [
    nodejs
  ];
  
  GREETING = "Get to work you lousy bum!";

  shellHook = ''
    echo $GREETING;
    npm audit;
  ''; 
}