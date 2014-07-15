jQuery(document).ready(function () {
	/////////////////////////////////////////////
	// Plan de jeux
    var canvas = document.getElementById('c'),
        c = canvas.getContext('2d'),
        hauteur, largeur, pixelsize, rate,
		ptJ1=0, ptJ2=0,
        gstarted = false, gpaused = false;
	
	// Le premier joueur a etre instancié
	var joueur = 1;
	
	// On déclare la classe
	var cTron = Class.create();
	
	///////////////////////////////////////////////////
	// On définit les méthodes et propriétés de la classe (initialize joue le role de constructeur)
	// C'est dans le constructeur qu'on déclare les propriétés de la classe.
	cTron.prototype = {	
	   // constructeur
	   initialize: function(nom, couleur) {
			this.pseudo = nom;
			this.color = couleur;
			this.dir;
			this.newdir;
			this.tron=[];
	   },
	   // Récupère le pseudo du joueur
	   getPlayer: function() {
	      return this.pseudo;
	   },
	   // Récupère la config touche du joueur
	   getColor: function() {
	      return this.color;
	   },
	   // Modifie la direction actuel
	   setDir: function(direction) {
	      this.dir=direction;
	   },
	   // Récupère la direction actuel
	   getDir: function() {
	      return this.dir;
	   },
	   // Modifie la nouvelle direction
	   setNewdir: function(sens) {
	      this.newdir=sens;
	   },
	   // Récupère la nouvelle direction actuel
	   getNewdir: function() {
	      return this.newdir;
	   },
	   // Récupère le tableaux des positions du tron
	   getTron: function() {
	      return this.tron;
	   },
	   // Vide le tableaux
	   videTron: function() {
			this.tron = new Array()	
	   },
	   // Modifie le tableaux des positions du tron
	   setTron: function(tab) {
		for ( x=0; x<tab.length; x++) {
		  for ( y=0; y<tab[x].length; y++) {
			if (!this.tron[x]) this.tron[x] = []; 
			this.tron[x][y] = tab[x][y];
		  }
		}
	   },
	   frame : function() {
			if(!gstarted || gpaused) {
				return;
			}		
			var coordonnee = this.getTron();
			var x = coordonnee[0][0], y = coordonnee[0][1]; // On récupère les coordonnée du j1_tron pour le diriger
	// 0->Haut 1->Droite 2->Bas 3->Gauche 
			switch(this.getNewdir()) {
				case 0:
					y--;
					break;
				case 1:
					x++;
					break;
				case 2:
					y++;
					break;
				case 3:
					x--;
					break;
			}
			if(testCollision(x, y, this)) { // Si il ya a collision, on perd
				endGame(this.pseudo);
				return;
			}
			coordonnee.unshift([x, y]);
			this.setTron(coordonnee);
	// La nouvelle coordonnée est placée en debut du tableau
			 this.setDir(this.getNewdir())	// On actualise la position

			drawTron(this); // On appelle la fonction qui dessine le j1_tron et sa trainée			
			//setInterval(this.frame(), rate);
			var that = this;
			setTimeout(function(){that.frame()}, rate);
		}
	};	
	
		var tron1 = new cTron('1',"#3ac6e5");
		var tron2 = new cTron('2',"#3ae5af");
	
	    // Paramètre, initialise les variables
    function setup(h, l, ps, r) {
        hauteur= h;
        largeur= l;
        pixelsize = ps;
        rate = r;
        canvas.height= h*ps; // hauteur du plan de jeux
        canvas.width = l*ps; // largeur du plan de jeux
        
		jQuery(document).keydown(function (e) { // on définis les touches (on ne peut pas revenir en arrière)
            //(38 = up, 39 = right, 40 = down, 37 = left, 32 = space)
            // 0->Haut 1->Droite 2->Bas 3->Gauche 			
			var j1_dir = tron1.getDir();
			var j2_dir = tron2.getDir();			
            switch(e.which) {
				case 38:
                    if(j1_dir != 2) {
                        tron1.setNewdir(0);
                    }
                    break;
                case 39:
                    if(j1_dir != 3) {
                        tron1.setNewdir(1);
                    }
                    break;
                case 40:
                    if(j1_dir != 0) {
                        tron1.setNewdir(2);
                    }
                    break;
                case 37:
                    if(j1_dir != 1) {
                        tron1.setNewdir(3);
                    }
                    break;
				case 90:
                    if(j2_dir != 2) {
                        tron2.setNewdir(0);
                    }
                    break;
                case 68:
                    if(j2_dir != 3) {
                        tron2.setNewdir(1);
                    }
                    break;
                case 83:
                    if(j2_dir != 0) {
                        tron2.setNewdir(2);
                    }
                    break;
                case 81:
                    if(j2_dir != 1) {
                        tron2.setNewdir(3);
                    }
                    break;	
                case 32:
                    if(!gstarted) {
                        startGame();
                    }
                    else {
                        togglePause();
                    }
                    break;
            }
        });		
        showIntro(); // affiche le message de debut
    }
    
    // Message du debut
    function showIntro() {
        c.fillStyle = '#004661';
        c.fillRect(0, 0, largeur*pixelsize, hauteur*pixelsize);
        // Rectangle noir de la taille du plan de jeux
		
	//	c.fillStyle = '#CCFFCC';
	//	var h1=50;
	//	var y1=hauteur*pixelsize-h1;
     //   c.fillRect(0, y1, largeur*pixelsize, h1);
		
	//	c.fillStyle = '#fff';
    //    c.font = '30px sans-serif';
     //   c.textAlign = 'center';
     //   c.fillText('Joueur 1 : ', 0, hauteur);
		
        c.fillStyle = '#fff';
        c.font = '30px sans-serif';
        c.textAlign = 'center';
        c.fillText('Tron 1.0 Beta', largeur/2*pixelsize, hauteur/4*pixelsize, largeur*pixelsize);
        // Ecrit en blanc Le message "Tron 1.0 Beta"
        c.font = '18px sans-serif';
        c.fillText('Space to start/pause the game', largeur/2*pixelsize, hauteur/2*pixelsize);
        //c.fillText('Fleches = changer direction.', largeur/2*pixelsize, hauteur/2*pixelsize);
        //c.fillText('Espace = commencer/pause.', largeur/2*pixelsize, hauteur/1.5*pixelsize);
        // Affiche les 2 autres messages
    }
	
	
		
	///////////////////////////////////////////////
	// Debut du jeux
    function startGame() {
		tron1.videTron();
		tron2.videTron();
		//La méthode floor() retourne le plus grand entier inférieur ou égal à la valeur donnée en paramètre.
        var x = 10, y = 10; 
        leTab = [
            [x, y],
            [--x, y],
            [--x, y],
            [--x, y]
        ];
		tron1.setTron(leTab);
		tron1.setDir(1);	// vers la droite
		tron1.setNewdir(1);	// vers la droite
		
		x = largeur-10;
		y = hauteur-10; 
        leTab = [
            [x, y],
            [++x, y],
            [++x, y],
            [++x, y]
        ];
		tron2.setTron(leTab);
		tron2.setDir(3);	// vers la gauche
		tron2.setNewdir(3);	// vers la gauche
		
        gstarted = true; // Jeux commencé
        gpaused = false; // Jeux pas en pause
		
		c.fillStyle = '#000';
		c.fillRect(0, 0, largeur*pixelsize, hauteur*pixelsize);
		c.fillStyle = '#fff';
	// On redéssine le tableaux de jeux en noir
	// Pour effacer les messages pause ou celui du début		
		tron2.frame();
        tron1.frame();
    }

    /////////////////////////////////
    // Pause
    function togglePause() {
        if(!gpaused) {
            gpaused = true; // met le jeux en pause
            c.fillStyle = '#fff';
            c.font = '20px sans-serif';
            c.textAlign = 'center';
            c.fillText('Pause', largeur/2*pixelsize, hauteur/2*pixelsize);
            // Affiche pause en blanc au centre
        }
        else {
            gpaused = false; // enleve la pause
			c.fillStyle = '#000';
			c.fillRect(0, 0, largeur*pixelsize, hauteur*pixelsize);
			c.fillStyle = '#fff';
			tron2.frame();
            tron1.frame();
        }
    }

    
////////////////////////////////////////////	
// On déssine le j1_tron et sa trainée
    function drawTron(dtron) {
        var i, l, x, y;
        for(i = 0, l = dtron.getTron().length; i < l; i++) {
            x = dtron.getTron()[i][0];
            y = dtron.getTron()[i][1];
			c.fillStyle = dtron.getColor();
            c.fillRect(x*pixelsize, y*pixelsize, pixelsize, pixelsize);
        }
    }
    
// On teste les colisions
    function testCollision(x, y, ttron) {
        var i, l;
        if(x < 0 || x > largeur-1) { // sur la largeur
            return true;
        }
        if(y < 0 || y > hauteur-1) { // sur la hauteur
            return true;
        }
        for(i = 0, l = ttron.getTron().length; i < l; i++) { // Avec le tron lui même
           if(x == ttron.getTron()[i][0] && y == ttron.getTron()[i][1]) {
                return true;
            }
        }
		
		if (ttron.getPlayer()==1)
			for(i = 0, l = tron2.getTron().length; i < l; i++) { // Avec le tron lui même
			   if(x == tron2.getTron()[i][0] && y == tron2.getTron()[i][1]) 
					return true;
			}	
        					
		else	
			for(i = 0, l = tron1.getTron().length; i < l; i++) { // Avec le tron lui même
			   if(x == tron1.getTron()[i][0] && y == tron1.getTron()[i][1]) 
					return true;		
			}
        return false;
   }
	
	////////////////////////////////
	// Fin du jeux
    function endGame(joueur) {
		
        gstarted = false;
        c.fillStyle = 'rgba(0,0,0,0.8)';
        c.fillRect(0, 0, largeur*pixelsize, hauteur*pixelsize);
        c.fillStyle = '#f00';
        c.font = '20px sans-serif';
        c.textAlign = 'center';
        c.fillText('Le joueur ' +joueur+ ' a perdu', largeur/2*pixelsize, hauteur/2*pixelsize);
		if (joueur==1)
			ptJ2++;
		else
			ptJ1++;
		
       // Affiche fin du jeux
    }
	
    setup(70, 70, 10, 100); // Procédure qui démarre le jeux, on précise la taille du plateau de jeux et du j1_tron, ainsi qui le nombre de fps
});
