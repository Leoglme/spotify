<?php
	include_once("RequestTrackAlbum.php");
	//$_GET['album']="";
	//print_r($_GET);
	$search= new RequestTrackAlbum();
	
	foreach($_GET as $key=>$value){
		
		switch($_GET){
			case $key=='album':
				echo $search->selectAlbum($value);
				break;
			case $key=='artist':
				echo $search->selectAlbumFromArtist($value);
				echo $search->getDetailArtist($value);
				/** a mettre la ou les méthodes de recherche par artiste --OK */
				break;
			case $key=='allAlbums':
				echo $search->listAlbums();
				break;
            case $key=='albumDetail':
                echo $search->detailAlbum($value);
                break;

            case $key=='genreDetail':
                echo $search->detailGenre($value);
                break;
			case $key=='allGenres':
				echo $search->getListGenre(); // On mettra ici la méthode de listing de genre  OK*/
				break;
				case $key=='allArtists':
			echo $search->getListArtist();   // On mettra ici la méthode de listing des artistes OK
			break;
			
			case $key=='track':
				echo $search->selectTrack($value);
				break;

            case $key=='alltrack':
                echo $search->selectAllTrack();
                break;
			case $key=='genre':
				echo $search->getDetailGenreAndIDAlbum($value);    // On mettra ici la méthode de recherche par genre
				break;
			
		}
		
	}
	

	
	
