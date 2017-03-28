function Item(input,data){
    var  resp = {
        data: [
              {x: 'a', y: 20},
              {x: 'b', y: 14},
              {x: 'c', y: 12},
              {x: 'd', y: 19},
              {x: 'e', y: 18},
              {x: 'f', y: 15},
              {x: 'g', y: 10},
              {x: 'h', y: 14}
        ],
        _id:null,
        uid:null,
        completedTime:null,
        requestDate:null,
        grade:{message: null, letter: null},
        issues:{
            meta: 0,
            security: 0,
            resources: 0,
            links: 0,
            tooManyLinks: false
        },
        meta:[],
        resources:[],
        requestId:null,
        links:[],
        url:{url: null, resolvedUrl: null},
        emails:[],
        redirects:[],
        captures:[],
        temp_id: null,
        i_id: null,
        status: 'complete',
        message: null,
        highlight: null
    }
    return newItem = _.extend(resp,input);

}
