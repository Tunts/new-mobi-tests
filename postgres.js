/**
 * Created by gustavo on 12/02/16.
 */

var pg = require('pg');
var cheerio = require('cheerio');
var config = require('./config');

var conString = "postgres://gustavo:@localhost/vivomaissaudavel";
var request = require('request');

var urlAdd = 'http://52.20.183.242:80/vms-backend/content/add';
var header = {
    'Content-Type': 'application/json'
};

try {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(
            'SELECT blog.id as id,' +
            ' blog.subcategoria_id as subcategoria_id,' +
            ' blog.title as title,' +
            ' blog.chamada_destaque as chamada_destaque,' +
            ' blog.content as content, ' +
            ' blog.slug as slug, ' +
            ' blog.image as image, ' +
            ' destaque.imagem as d_image, ' +
            ' principal.slug as p_slug, ' +
            ' sub.slug as s_slug' +
            ' from blog_blogpost as blog, ' +
            ' menu_categoriaprincipal as principal, ' +
            ' menu_categoriaconteudo as sub, ' +
            ' conteudo_destaque as destaque '+
            ' where principal.id = blog.categoria_principal_id ' +
            ' and sub.id = blog.subcategoria_id ' +
            ' and destaque.conteudo_id = blog.id ' +
            ' order by blog.publish_date desc' +
            ' limit 20 offset 0'

            , function (err, result) {
                //call `done()` to release the client back to the pool
                done();

                if (err) {
                    return console.error('error running query', err);
                }

                //console.log(result.rows);

                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows[i];

                    (function (r) {

                        $ = cheerio.load(r.content);
                        var texto = $.root().text();

                        var obj = {
                            "partner_key": config.partner_key,
                            "partner_id": 2,
                            "premium_content": 0,
                            "content_type": 1,
                            "channel_id": r.subcategoria_id,
                            "content_title": r.title,
                            "content_subtitle": r.chamada_destaque,
                            "content_text": texto,
                            "content_highres_link": "http://vivomaissaudavel.com.br/static/media/"+r.d_image,
                            "content_lowres_link": "http://vivomaissaudavel.com.br/static/media/"+r.d_image,
                            "partner_fullcontent_link": "http://vivomaissaudavel.com.br/" + r.p_slug + '/' + r.s_slug + '/' + r.slug
                        };

                        console.log(obj.content_text);

                        //request({
                        //    url: urlAdd,
                        //    headers: header,
                        //    body: JSON.stringify(obj),
                        //    method: 'POST'
                        //}, function (err, res, body) {
                        //    var id = r.id;
                        //    var resp = JSON.parse(body).Response;
                        //    console.log(resp.content_id + ',' + id);
                        //});
                    })(row);

                }

                client.end();
            });
    });
}catch(e){
    console.log(e);
}