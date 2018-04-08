Backbone.rxView = Backbone.View.extend({

    delegateEvents: function(events) {
        Backbone.View.prototype.delegateEvents.apply(this, events);

        this.rxEvents();
    },

    rxEvents: function() {
        /** custom events go here... */
    },

    rxEvent: function(key) {
        var me = this,
            delegateEventSplitter = /^(\S+)\s*(.*)$/;

        var match = key.match(delegateEventSplitter);

        return Rx.Observable.create(function(obs) {
            me.$el.on(match[1]+'.delegateEvents'+ me.cid, match[2], function(ev) {
                obs.next(ev);
            })
        });
    }
});

Backbone.rxModel = Backbone.Model.extend({
    rxEvent: function(key) {
        var me = this;

        return Rx.Observable.create(function(obs) {
            me.on(key, function() {
                obs.next(me);
            });

            me.on('error', function(model, error) {
                obs.error(model, error);
            })
        });
    }
});

Backbone.rxCollection = Backbone.Model.extend({

    rxEvent: function(key) {
        var me = this;

        return Rx.Observable.create(function(obs) {
            me.on(key, function() {
                obs.next(me);
            });

            me.on('error', function(model, error) {
                obs.error(model, error);
            })
        });
    }
});