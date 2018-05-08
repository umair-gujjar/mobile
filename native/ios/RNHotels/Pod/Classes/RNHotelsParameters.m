//
//  RNHotelsParameters.m
//  RNHotels
//
//  Created by Radek Pistelak on 16/02/2018.
//  Copyright © 2018 Kiwi.com. All rights reserved.
//

#import "RNHotelsParameters.h"

#import <CoreLocation/CoreLocation.h>
#import <React/RCTBundleURLProvider.h>

@interface RNHotelsParameters()

@property (nonatomic, strong) NSString *jsBundleExtension;
@property (nonatomic, strong) NSString *resourceName;

@end

@implementation RNHotelsParameters

- (instancetype)initWithLanguage:(NSString *)language
                    currencyCode:(NSString *)currencyCode
                    userLocation:(CLLocation *)userLocation
                         affilId:(NSString *)affilID {
    self = [super init];
    if (self) {
        _currencyCode = currencyCode;
        _language = language;
        _userLocation = userLocation;
        _affilID = affilID;

        _resourceName = @"RNHotels";
        _jsBundleExtension = @"js";
        _moduleName = @"KiwiHotels";
    }

    return self;
}

- (NSDictionary<NSString *,NSObject *> *)initialProperties {

    NSMutableDictionary<NSString *, NSObject *> *dictionary = [[NSMutableDictionary alloc] init];

    dictionary[@"language"] = [[self language] lowercaseString];
    dictionary[@"currency"] = [[self currencyCode] uppercaseString];
    dictionary[@"bookingComAffiliate"] = [self affilID];

    if (self.userLocation) {
        dictionary[@"coordinates"] = @{
            @"latitude":  @(self.userLocation.coordinate.latitude),
            @"longitude": @(self.userLocation.coordinate.longitude)
        };
    }

    return [dictionary copy];
}

#pragma mark -

- (NSURL *)jsCodeLocation {
    return [[NSBundle bundleForClass:[self class]] URLForResource:[self resourceName] withExtension:[self jsBundleExtension]];
}

@end
