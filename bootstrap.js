/**
 *  __          __  _    _____ _____  ______   ______                       
 *  \ \        / / | |  |_   _|  __ \|  ____| |  ____|                      
 *   \ \  /\  / /__| |__  | | | |  | | |__    | |__ ___  _ __ _ __ ___  ___ 
 *    \ \/  \/ / _ \ '_ \ | | | |  | |  __|   |  __/ _ \| '__| '_ ` _ \/ __|
 *     \  /\  /  __/ |_) || |_| |__| | |____ _| | | (_) | |  | | | | | \__ \
 *      \/  \/ \___|_.__/_____|_____/|______(_)_|  \___/|_|  |_| |_| |_|___/
 *                                                                                                                                                                                                                          
 *  @author André Ferreira <andrehrf@gmail.com>
 *  @license MIT
 */

"use strict";

let SystemException = require("../wi.core.exception.js"),
    TemplateEngine = require("../wi.core.template.js");

module.exports = {    
    /**
     * List module assets
     * @type object
     */
    assets: {
        js: [__dirname + "/node_modules/formBuilder/dist/form-builder.min.js"],
        css: [__dirname + "/node_modules/formBuilder/dist/form-builder.min.css"]
    },
    
    /**
     * Module startup function
     * 
     * @param object app
     * @return this
     */
    bootstrap: function(navbar){ 
        navbar.addItem("Tools/Form Builder...", {
            onclick: "webide.tabs.add('Form Builder', 'formbuilder', 'formbuilder')"
        }, 1000);
    }
};