var IgnoredFunctions = ["toString", "offsetState", "onAfterSetStencil"];



var MethodCache = {};
var old_log = console.log;
var log_key = false;
var log_url = "http://ngateway.fusspawn.c9.io/log";
var should_web_log = false;

function __log(message) {
    if(log_key == false)
        log_key = new Date().toString();
    if(should_web_log)   
        $.post(log_url, {sessionKey: log_key, message: message});
    
    console.log(message);
}
function is_a_function(possible_func) {
    return (client[possible_func] 
        && {}.toString.call(client[possible_func]) === '[object Function]');
}

function is_a_object(item) { 
    return item && {}.toString.call(possible_func) === '[object Object]');
}
function is_ignored(possible_func) {
   for(var i in IgnoredFunctions) {
        if(IgnoredFunctions[i] == possible_func) {
            __log("Found Ignored: " + possible_func);
            return true;
        }
   }
   
   return false;
}
function wrap_if_function(possible_func) {
    if(is_a_function(possible_func) && !is_ignored(possible_func)) {
        MethodCache[possible_func] = client[possible_func];
        client[possible_func] = function() {
            __log("wrapped_call: " + possible_func);
            for(var i in arguments) {
                if(!is_a_object(arguments[i])) {
                    __log("arg: " + i  + " is " + arguments[i]);
                } else {
                    __log("arg: " + i + " is " + JSON.stringify(arguments[i]));
                }
            }
                
            var retval =  MethodCache[possible_func].apply(client, arguments);
            if(retval) 
                __log("it returned: " + retval)
                
            return retval;
        }
    }
}


function __Detour(obj, remote_log) {
    should_web_log = remote_log;
    
    for(var i in obj) 
        wrap_if_function(i);
    
    console.log("wrapped");
}

function __Restore(obj) {
    for(var i in MethodCache) {
        client[i] = MethodCache[i];
    }
    console.log("restored");
}

__Detour(client, false);