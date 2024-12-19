'use strict'

const dotenv = require('dotenv');
const puppeteer = require('puppeteer');

(async () => {
    dotenv.config();

    const browser = await puppeteer.launch({ 
        headless: false 
    });

    const [page] = await browser.pages();

    await page.goto(process.env.ROCKTHESPORT_URL, { 
        waitUntil: 'networkidle0', 
        timeout: 0 
    });

    //*race*
    await page.locator('[id="cphCuerpo_tarifa_135926_-1_btContinuar"]').click();

    //*login*
    await page.locator('[id="cphCuerpo_btDeportistaIdentificate"]').click();
    await page.waitForSelector('[id="cphCuerpo_tbLoginDeportista"]');
    await page.type('[id="cphCuerpo_tbLoginDeportista"]', process.env.ROCKTHESPORT_USER);
    await page.type('[id="cphCuerpo_tbPasswordDeportista"]', process.env.ROCKTHESPORT_PWD);
    await page.locator('[id="cphCuerpo_btValidarDeportista"]').click();
    await page.waitForNavigation();
    
    //*form*
    await page.select('[id="pregunta_15"]', process.env.COUNTRY);
    await page.type('[id="cphCuerpo_pregunta_121181_tbRespuesta"]', process.env.CITY);
    await page.select('[id="pregunta_13218"]', process.env.NATIONALITY);
    await page.select('[id="cphCuerpo_pregunta_7_ddlTipoDocumento"]', process.env.DOCUMENT_TYPE);
    await page.type('[id="cphCuerpo_pregunta_7_tbRespuesta"]', process.env.DOCUMENT_ID);
    await page.select('[id="cphCuerpo_pregunta_10_ddlPrefijo"]', process.env.CONTACT_PREFIX);
    await page.type('[id="cphCuerpo_pregunta_10_tbRespuesta"]', process.env.CONTACT);
    await page.select('[id="cphCuerpo_pregunta_121402_ddlPrefijo"]', process.env.CONTACT_PREFIX);
    await page.type('[id="cphCuerpo_pregunta_121402_tbRespuesta"]', process.env.CONTACT);
    await page.type('[id="cphCuerpo_pregunta_121188_tbRespuesta"]', process.env.EMERGENCY_NAME);
    await page.select('[id="cphCuerpo_pregunta_121403_ddlPrefijo"]', process.env.EMERGENCY_CONTACT_PREFIX);
    await page.type('[id="cphCuerpo_pregunta_121403_tbRespuesta"]', process.env.EMERGENCY_CONTACT);
    await page.type('[id="cphCuerpo_pregunta_121184_tbRespuesta"]', process.env.CLUB_NAME);
    await page.click('[id="op310781"][value="' + process.env.TSHIRT + '"]');
    await page.click('[id="op310784"][value="' + process.env.TSHIRT_SIZE + '"]');
    await page.click('[id="op310789"][value="' + process.env.MADEIRA_RESIDENT + '"]');
    await page.select('[id="pregunta_121192"]', process.env.INVOICE);
    await page.waitForSelector('[id="cphCuerpo_pregunta_121194_tbRespuesta"]');
    await page.type('[id="cphCuerpo_pregunta_121194_tbRespuesta"]', process.env.INVOICE_NAME);
    await page.waitForSelector('[id="cphCuerpo_pregunta_121196_tbRespuesta"]');
    await page.type('[id="cphCuerpo_pregunta_121196_tbRespuesta"]', process.env.INVOICE_NIF);
    await page.type('[id="cphCuerpo_pregunta_121198_tbNumero"]', process.env.FEDERATION_ID);
    //await page.type('[id="cphCuerpo_pregunta_121199_tbNumero"]', process.env.ITRA_ID);
    await page.click('[id="op310793"][value="' + process.env.VEGAN + '"]');
    await page.click('[id="op310803"][value="' + process.env.TRANSPORT + '"]');
    await page.select('[id="pregunta_121203"]', process.env.RGPD);
    await page.click('[id="op310800"][value="' + process.env.FLAGS + '"]');
    await page.select('[id="pregunta_121209"]', process.env.RESPOSABILITY);
    await page.select('[id="pregunta_121590"]', process.env.RULES);
    await page.locator('[id="cphCuerpo_btFinalizar"]').click();
    await page.waitForNavigation();

    //*insurance*
    await page.evaluate(() => {
        document.querySelector('.styles-protectionToggleWrapper-xOOdM > .styles-refundLabel-bC2AV > input[type="radio"]').click();
    });
    await page.locator('[id="cphCuerpo_btGuardar"]').click();
    await page.waitForNavigation();

    //*cart*
    await page.waitForSelector('[id="cphCuerpo_lbFinalizar"]');
    await page.select('[id="cphCuerpo_ddlEmailsBanWire"]', process.env.ROCKTHESPORT_USER);
    await page.locator('[id="cphCuerpo_lbFinalizar"]').click();
    await page.waitForNavigation();

    //*payment*
    await page.locator('[id="cphCuerpo_btFinalizar"]').click();
    await page.waitForNavigation();
    
    //*payment*
    await page.type('[id="inputCard"]', process.env.PAYMENT_CARD_NUMBER);
    await page.type('[id="cad1"]', process.env.PAYMENT_CARD_EXP_MONTH);
    await page.type('[id="cad2"]', process.env.PAYMENT_CARD_EXP_YEAR);
    await page.type('[id="codseg"]', process.env.PAYMENT_CARD_CCV);
    await page.locator('[id="divImgAceptar"]').click();
    await page.waitForNavigation();

    //await browser.close();
})()
    .catch(err => console.error(err))
