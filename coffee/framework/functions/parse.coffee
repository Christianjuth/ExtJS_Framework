parse :
  array : () ->
    #vars
    output = []
    array = arguments
    #parse array
    for item in array
      if typeof item is "string"
        output.push item
      else
        output = output.concat item
    return output

  #This function will make the input text all
  #lowercase and replace spaces with "_". This
  #can be useful for tasks where spaces are not.
  #allowed
  id : (id) ->
    id.toLowerCase().replace(/\ /g,"_")
