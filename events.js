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

webide.module("forms", function(tabs, commands){
    //Register tab type
    tabs.layout.registerComponent('formbuilder', function(container, state){
        container.id = state.id;
        container.getElement().html("<div id='wi-formbuilder-" + state.id + "' class='wi-formbuilder'></div>");
        tabs.itens[state.id].container = container;
        
        setTimeout(function(id){ $("#wi-formbuilder-" + id).formBuilder({dataType: 'json', editOnAdd: true}); }, 300, state.id);
        
        if(typeof tabs.itens[state.id].cb == "function")
            tabs.itens[state.id].cb(state.id);
    });
    
    this.forms = {
        /**
         * Function to associate custom forms
         * 
         * @return void
         */
        bind: function(){
            //Spins
            $(".wi-spin").each(function(){
                var $input = $("input", this);

                $("span:first", this).click(function(){
                    var value = parseInt($input.val());

                    if(value-1 < 0)
                        value = 0;
                    else
                        value--;

                    $input.val(value);
                    $input.trigger("change");
                });
                
                $("span:last", this).click(function(){
                    var value = parseInt($input.val());
                    $input.val(value + 1);
                    $input.trigger("change");
                })
            }); 
        },
        
        /**
         * Function to validate form
         * 
         * @param string form
         * @return boolean
         */
        validate: function(form){
            var validated = true;
            
            $(form + " input[type=text]").each(function(elem, index){
                //Requered
                if(this.hasAttribute("required") && (typeof $(this).val() !== "string" || $(this).val() === "")){
                    $(this).parent().addClass("wi-input-error");
                    validated = false;
                    
                    $(this).change(function(){ $(this).parent().removeClass("wi-input-error"); });
                    $(this).keydown(function(){ $(this).parent().removeClass("wi-input-error"); });
                }
            });
            
            $(form + " input[type=url]").each(function(elem, index){                                           
                if(this.hasAttribute("required") || $(this).val() !== ""){//Requered
                    //@see http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
                    if(!/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test($(this).val())){
                        $(this).parent().addClass("wi-input-error");
                        validated = false;

                        $(this).change(function(){ $(this).parent().removeClass("wi-input-error"); });
                        $(this).keydown(function(){ $(this).parent().removeClass("wi-input-error"); });
                    }
                }
            });
            
            return validated;
        },
        
        /**
         * Function to convert date key in string format to object
         * 
         * @param object dataReturn
         * @param string key
         * @param mixed value
         * @return object
         */
        _parseKeyData: function(dataReturn, key, value){
            if(/\./img.test(key)){
                var route = key.split(".");
                var reverse = "{";
                
                route.forEach(function(item, index){
                    if(index == route.length - 1){
                        reverse = reverse.substr(0, reverse.length-1);
                        
                        switch(typeof value){
                            case "string": reverse += "{\""+ item + "\":\"" + value + "\"}"; break;
                            case "number": reverse += "{\""+ item + "\":" + value + "}"; break;
                            case "boolean": reverse += "{\""+ item + "\":" + value + "}"; break;
                            case "object": reverse += "{\""+ item + "\":" + JSON.stringify(value) + "}"; break;
                        }                      
                        
                        for(var i = 0; i < route.length-1; i++)
                            reverse += "}";
                        
                        dataReturn = _.merge(dataReturn, JSON.parse(reverse));
                    }
                    else{
                        reverse += "\""+item + "\": {";
                    }
                });          
            }
            else{
                dataReturn[key] = value;
            }
            
            return dataReturn;
        },
        
        /**
         * Function to return form data in object format
         * 
         * @param string form
         * @return object
         */
        data: function(form){
            var _this = this,
                dataReturn = {};
            
            $(form + " input[type=text]").each(function(elem, index){ dataReturn = _this._parseKeyData(dataReturn, $(this).attr("name"), $(this).val()); });
            $(form + " input[type=passwork]").each(function(elem, index){ dataReturn = _this._parseKeyData(dataReturn, $(this).attr("name"), $(this).val()); });
            $(form + " input[type=url]").each(function(elem, index){ dataReturn = _this._parseKeyData(dataReturn, $(this).attr("name"), $(this).val()); });
            $(form + " input[type=email]").each(function(elem, index){ dataReturn = _this._parseKeyData(dataReturn, $(this).attr("name"), $(this).val()); });
            $(form + " input[type=checkbox]").each(function(elem, index){ dataReturn = _this._parseKeyData(dataReturn, $(this).attr("name"), $(this).prop("checked")); });
            $(form + " select").each(function(elem, index){ dataReturn = _this._parseKeyData(dataReturn, $(this).attr("name"), $(this).val()); });
            
            return dataReturn;
        }
    };
});