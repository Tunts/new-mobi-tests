/**
 * Created by gustavo on 07/12/15.
 */

var expect = require('chai').expect;
var request = require('request');
var objects = require('./objects');
var url = require('./url');

describe('Integration test - New Mobi:', function () {

    var header = {
        'Content-Type': 'application/json'
    };

    var urlAdd = url + '/add';

    describe('-------------------- Add --------------------', function () {

        it('Should successfully add the object.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                if (resposta.operation_status != 0) {
                    console.log('----------\nSucesso - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                }

                expect(resposta.operation_status).to.be.equal(0);
                expect(res.statusCode).to.be.equal(200);

                done();
            });
        });

        it('Should return status code 415 - No headers.', function (done) {
            request({url: urlAdd, body: JSON.stringify(objects.success), method: 'POST'}, function (err, res, body) {

                expect(res.statusCode).to.be.equal(415);

                done();
            });
        });

        it('Should return fail - Chave inválida.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.invalidKey),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                if (resposta.operation_status != 1) {
                    console.log('----------\nChave inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                }

                expect(resposta.operation_status).to.be.equal(1);

                done();
            });
        });

        it('Should return fail - Canal inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.invalidChannel),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                if (resposta.operation_status != 2) {
                    console.log('----------\nCanal inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                }

                expect(resposta.operation_status).to.be.equal(2);

                done();
            });
        });

        it('Should return fail - Tipo de conteúdo inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.invalidContentType),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                if (resposta.operation_status != 3) {
                    console.log('----------\nTipo de conteúdo inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                }

                expect(resposta.operation_status).to.be.equal(3);

                done();
            });
        });

        it('Should return fail - Conteúdo inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.invalidContent),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                if (resposta.operation_status != 4) {
                    console.log('----------\nConteúdo inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                }

                expect(resposta.operation_status).to.be.equal(4);

                done();
            });
        });

    });

    describe('-------------------- Update --------------------', function () {

        var urlUpdate = url + '/update';

        it('Should successfully update the object.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var successUpdate = objects.success;
                successUpdate.content_id = resposta.content_id;

                request({
                    url: urlUpdate,
                    headers: header,
                    body: JSON.stringify(successUpdate),
                    method: 'POST'
                }, function (err, res, body) {

                    resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 0) {
                        console.log('----------\nSucesso - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(res.statusCode).to.be.equal(200);
                    expect(resposta.operation_status).to.be.equal(0);


                    done();
                });
            });
        });

        it('Should return status code 415 - No headers.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var successUpdate = objects.success;
                successUpdate.content_id = resposta.content_id;

                request({
                    url: urlUpdate,
                    body: JSON.stringify(successUpdate),
                    method: 'POST'
                }, function (err, res, body) {

                    expect(res.statusCode).to.be.equal(415);

                    done();
                });
            });
        });

        it('Should return fail - Chave inválida.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var invalidKeyUpdate = objects.invalidKey;
                invalidKeyUpdate.content_id = resposta.content_id;

                request({
                    url: urlUpdate,
                    headers: header,
                    body: JSON.stringify(invalidKeyUpdate),
                    method: 'POST'
                }, function (err, res, body) {

                    var resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 1) {
                        console.log('----------\nChave inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(resposta.operation_status).to.be.equal(1);

                    done();
                });
            });
        });

        it('Should return fail - Canal inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var invalidChannelUpdate = objects.invalidChannel;
                invalidChannelUpdate.content_id = resposta.content_id;

                request({
                    url: urlUpdate,
                    headers: header,
                    body: JSON.stringify(invalidChannelUpdate),
                    method: 'POST'
                }, function (err, res, body) {

                    console.log(body);

                    var resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 2) {
                        console.log('----------\nCanal inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(resposta.operation_status).to.be.equal(2);

                    done();
                });
            });
        });

        it('Should return fail - Conteúdo ID inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var invalidContentIDUpdate = objects.success;
                invalidContentIDUpdate.content_id = null;

                request({
                    url: urlUpdate,
                    headers: header,
                    body: JSON.stringify(invalidContentIDUpdate),
                    method: 'POST'
                }, function (err, res, body) {

                    var resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 3) {
                        console.log('----------\nConteúdo inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(resposta.operation_status).to.be.equal(3);

                    done();
                });
            });
        });
    });

    describe('-------------------- Delete --------------------', function () {

        var urlDelete = url + '/delete';

        it('Should successfully delete the object.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var successDelete = objects.success;
                successDelete.content_id = resposta.content_id;

                request({
                    url: urlDelete,
                    headers: header,
                    body: JSON.stringify(successDelete),
                    method: 'POST'
                }, function (err, res, body) {

                    resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 0) {
                        console.log('----------\nSucesso - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(res.statusCode).to.be.equal(200);
                    expect(resposta.operation_status).to.be.equal(0);


                    done();
                });
            });
        });

        it('Should return status code 415 - No headers.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var successUpdate = objects.success;
                successUpdate.content_id = resposta.content_id;

                request({
                    url: urlDelete,
                    body: JSON.stringify(successUpdate),
                    method: 'POST'
                }, function (err, res, body) {

                    expect(res.statusCode).to.be.equal(415);

                    done();
                });
            });
        });

        it('Should return fail - Chave inválida.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var invalidKeyDelete = objects.invalidKey;
                invalidKeyDelete.content_id = resposta.content_id;

                request({
                    url: urlDelete,
                    headers: header,
                    body: JSON.stringify(invalidKeyDelete),
                    method: 'POST'
                }, function (err, res, body) {

                    var resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 1) {
                        console.log('----------\nChave inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(resposta.operation_status).to.be.equal(1);

                    done();
                });
            });
        });

        it('Should return fail - Canal inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var resposta = JSON.parse(body).Response;

                var invalidChannelDelete = objects.invalidChannel;
                invalidChannelDelete.content_id = resposta.content_id;

                request({
                    url: urlDelete,
                    headers: header,
                    body: JSON.stringify(invalidChannelDelete),
                    method: 'POST'
                }, function (err, res, body) {

                    var resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 2) {
                        console.log('----------\nCanal inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(resposta.operation_status).to.be.equal(2);

                    done();
                });
            });
        });

        it('Should return fail - Conteúdo ID inválido.', function (done) {
            request({
                url: urlAdd,
                headers: header,
                body: JSON.stringify(objects.success),
                method: 'POST'
            }, function (err, res, body) {

                var invalidContentIDDelete = objects.success;
                invalidContentIDDelete.content_id = null;

                request({
                    url: urlDelete,
                    headers: header,
                    body: JSON.stringify(invalidContentIDDelete),
                    method: 'POST'
                }, function (err, res, body) {

                    var resposta = JSON.parse(body).Response;

                    if (resposta.operation_status != 3) {
                        console.log('----------\nConteúdo inválida - Erro ' + resposta.operation_status + ' - ' + resposta.description);
                    }

                    expect(resposta.operation_status).to.be.equal(3);

                    done();
                });
            });
        });

    });

})
;