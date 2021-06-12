<?php
//header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include_once("DbConnect.php");

class RequestTrackAlbum
{
    private $track = "";
    private $album = "";
    public $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    //methodes de Nico

    private function validateData($donnees)

    {
        //gerer la longueur
        $donnees = trim($donnees);          // retirer les espaces
        $donnees = stripslashes($donnees);   // retirer les antislashes
        $donnees = htmlspecialchars(htmlspecialchars_decode($donnees));
        return $donnees;
    }

    private function setTrack($track)
    {
        $this->track = $this->validateData($track);
    }


    private function setAlbum($album)
    {
        $this->album = $this->validateData($album);
    }

    public function detailGenre($album){
        $res = [];
        $albumInfo = [];
        $req = $this->db->query("SELECT DISTINCT albums.name AS album, artists.name AS artist, albums.cover AS cover , genres.name AS genreName FROM albums 
            INNER JOIN artists ON artists.id = albums.artist_id 
            INNER JOIN genres_albums ON genres_albums.album_id = albums.id 
            INNER JOIN genres ON genres.id = genres_albums.genre_id WHERE genres.name = '$album'");
        foreach ($req->fetchAll() as $value) {
            array_push($res, array(
                "name" => $value['album'],
                "genre" => $value['genreName'],
                "artist" => $value['artist'],
                "cover" => $value['cover']
            ));
        }

        $req = $this->db->query("SELECT albums.id, albums.cover AS cover, albums.name AS albumName, albums.release_date, COUNT(albums.id) AS countAlbum, genres.name AS genreName, genres.id AS idGenre FROM albums 
        INNER JOIN genres_albums ON genres_albums.album_id = albums.id 
            INNER JOIN genres ON genres.id = genres_albums.genre_id WHERE genres.name = '$album'");
        foreach ($req->fetchAll() as $value) {
            array_push($albumInfo, array(
                "name" => $value['genreName'],
                "countAlbum" => $value['countAlbum'],
                "id" => $value['idGenre']
            ));
        }

        $res = array("genreInfo" => $albumInfo, "albums" => $res);
        return json_encode($res);
     }

    public function detailAlbum($album)
    {
        $res = [];
        $albumInfo = [];
        $req = $this->db->query("SELECT DISTINCT tracks.name, mp3, artists.name AS artist, albums.cover AS cover, albums.name AS albumName, albums.release_date FROM tracks 
            INNER JOIN albums ON albums.id = tracks.album_id 
            INNER JOIN artists ON artists.id = albums.artist_id WHERE albums.name = '$album'");

        foreach ($req->fetchAll() as $value) {
            array_push($res, array(
                "name" => $value['name'],
                    "href" => $value['mp3'],
                    "artist" => $value['artist'],
                    "cover" => $value['cover']
            ));
        }

        $req = $this->db->query("SELECT DISTINCT artists.name AS artist, albums.cover AS cover, albums.name AS albumName, albums.release_date FROM albums 
        INNER JOIN artists ON artists.id = albums.artist_id WHERE albums.name = '$album'");
        foreach ($req->fetchAll() as $value) {
            array_push($albumInfo, array(
                "name" => $value['albumName'],
                "artist" => $value['artist'],
                "date" => $value['release_date'],
                "cover" => $value['cover']
            ));
        }

        $res = array("albumInfo" => $albumInfo, "songs" => $res);
        return json_encode($res);
    }

    public function selectAlbum($album) // cherche un album
    {
        $this->setAlbum($album);
        $req = $this->db->prepare("SELECT DISTINCT a.*,ar.name as 'artiste', count(t.id) as 'nombre de pistes'
            FROM albums a INNER JOIN tracks t ON a.id=t.album_id INNER JOIN artists ar ON a.artist_id=ar.id
            WHERE a.name like :name GROUP BY RAND()"
        );
        $req->bindValue(':name', "%" . $this->album . "%", PDO::PARAM_STR);
        $req->execute();
        return json_encode($req->fetchAll(PDO::FETCH_ASSOC));
    }

    public function selectAlbumFromArtist($artist) // recupere les albums de l'artiste
    {
        $artist = $this->validateData($artist);

        $req = $this->db->prepare("SELECT a.*, artists.name FROM albums a inner join artists ON a.artist_id=artists.id WHERE artists.name like :name ");
        $req->bindValue(':name', "%" . $artist . "%", PDO::PARAM_STR);
        $req->execute();
        return json_encode($req->fetchAll(PDO::FETCH_ASSOC));
    }

    public function listAlbums()  //recupere la liste complete des albums
    {
        $req = $this->db->prepare("SELECT artists.name as 'artist', a.* FROM albums a inner join artists ON a.artist_id=artists.id");
        $req->execute();
        return json_encode($req->fetchAll(PDO::FETCH_ASSOC));

    }

    public function selectTrack($track)      //cherche une chanson
    {
        $this->setTrack($track);
        $req = $this->db->prepare("	SELECT  t.*, ar.name as 'artist', al.name as 'album' FROM tracks t
    										INNER JOIN artists ar ON t.id=ar.id INNER JOIN albums al on t.album_id = al.id
											WHERE t.name like :name ");
        $req->bindValue(':name', "%" . $this->track . "%", PDO::PARAM_STR);
        $req->execute();
        return json_encode($req->fetchAll(PDO::FETCH_ASSOC));
    }


    public function selectAllTrack()      //cherche une chanson
    {
        $res = [];
        $req = $this->db->query("SELECT DISTINCT tracks.name, mp3, artists.name AS artist, albums.cover_small AS cover FROM tracks 
            INNER JOIN albums ON albums.id = tracks.album_id 
            INNER JOIN artists ON artists.id = albums.artist_id ORDER by RAND()");
        foreach ($req->fetchAll() as $value) {
            array_push($res, array(
                "name" => $value['name'],
                "href" => $value['mp3'],
                "artist" => $value['artist'],
                "cover" => $value['cover']
            ));
        }
        return json_encode($res);

    }


    // methodes de Coco


    public function getListArtist()
    {

        $sql = "
                        SELECT *
                        FROM artists
                   ";
        $data = $this->db->prepare($sql);
        $data->execute();
        $result = $data->fetchAll(PDO::FETCH_ASSOC);

        $arrayListArtist = [];
        $i = 0;

        while (!empty($result[$i])) {

            $arrayForOneEnter = [];
            $arrayForOneEnter['id'] = $this->securityValue($result[$i]['id']);
            $arrayForOneEnter['name'] = $this->securityValue($result[$i]['name']);
            $arrayForOneEnter['description'] = $this->securityValue($result[$i]['description']);
            $arrayForOneEnter['bio'] = $this->securityValue($result[$i]['bio']);
            $arrayForOneEnter['photo'] = $this->securityValue($result[$i]['photo']);

            $arrayListArtist[] = $arrayForOneEnter;

            $i++;
        }

        return json_encode($arrayListArtist);

    }

    public function getDetailArtist($nameArtist)
    {

        $sql = "
                        SELECT *
                        FROM artists
                        WHERE artists.name = '$nameArtist'
                   ";

        $data = $this->db->prepare($sql);
        $data->execute();
        $result = $data->fetch();

        $arrayOneArtist = [];

        if (!empty($result)) {
            $arrayArtist = [];
            $arrayArtist['id'] = $this->securityValue($result['id']);
            $arrayArtist['name'] = $this->securityValue($result['name']);
            $arrayArtist['description'] = $this->securityValue($result['description']);
            $arrayArtist['bio'] = $this->securityValue($result['bio']);
            $arrayArtist['photo'] = $this->securityValue($result['photo']);

            $arrayOneArtist[] = $arrayArtist;
        }

        return json_encode($arrayOneArtist);
        //print_r($arrayOneArtist);

    }


    public function getListGenre()
    {

        $sql = "
                        SELECT *
                        FROM genres
                   ";
        $data = $this->db->prepare($sql);
        $data->execute();
        $result = $data->fetchAll(PDO::FETCH_ASSOC);

        $arrayListGenre = [];
        $i = 0;

        while (!empty($result[$i])) {

            $arrayGenre = [];
            $arrayGenre['id'] = $this->securityValue($result[$i]['id']);
            $arrayGenre['name'] = $this->securityValue($result[$i]['name']);

            $arrayListGenre[] = $arrayGenre;

            $i++;
        }

        return json_encode($arrayListGenre);
        //print_r($arrayListGenre);

    }

    public function searchContent()
    {
        $SQL = "SELECT * FROM tracks WHERE tracks.name LIKE '%After%'";
    }

    public function getDetailGenreAndIDAlbum($nameGenre)
    {

        $nameGenre = $this->securityValue($nameGenre);

        $sql = "
                        SELECT *
                        FROM genres
                        WHERE genres.name = :name
                   ";

        $data = $this->db->prepare($sql);
        $data->bindValue(':name', $nameGenre, PDO::PARAM_STR);

        $data->execute();

        $result = $data->fetch(PDO::FETCH_ASSOC);

        if (!empty($result)) {


            $idGenre = $this->securityValue($result['id']);

            $sql = "SELECT *
                            FROM genres_albums
                            WHERE genre_id = '$idGenre'
                       ";
            $data = $this->db->prepare($sql);
            $data->execute();
            $result = $data->fetchAll(PDO::FETCH_ASSOC);

            $arrayGenreAndIDAlbum = [];
            $i = 0;

            while (!empty($result[$i])) {

                $arrayGenreDetailAndID = [];

                $arrayGenreDetailAndID['id'] = $idGenre;
                $arrayGenreDetailAndID['name'] = $nameGenre;
                $arrayGenreDetailAndID['id_album'] = $this->securityValue($result[$i]['album_id']);

                $arrayGenreAndIDAlbum[] = $arrayGenreDetailAndID;
                $i++;
            }

            return json_encode($arrayGenreAndIDAlbum);
        } else {
            return false;
        }

    }

    public function securityValue($var): string
    {

        $var = trim($var);
        $var = stripslashes($var);
        $var = htmlspecialchars($var);
        $var = htmlspecialchars_decode($var);

        return $var;
    }

}