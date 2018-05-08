//
//  RNHotelsParameters.h
//  RNHotels
//
//  Created by Radek Pistelak on 16/02/2018.
//  Copyright © 2018 Kiwi.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@class CLLocation;

NS_ASSUME_NONNULL_BEGIN

@interface RNHotelsParameters: NSObject

- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithLanguage:(NSString *)language
                    currencyCode:(NSString *)currencyCode
                    userLocation:(CLLocation *)userLocation
                         affilId:(NSString *)affilID;

@property (nonatomic, copy, readonly) NSString *moduleName;
@property (nonatomic, copy, readonly) NSURL *jsCodeLocation;

@property (nonatomic, copy, readonly) NSString *language;
@property (nonatomic, copy, readonly) NSString *currencyCode;
@property (nonatomic, copy, readonly) CLLocation *userLocation;
@property (nonatomic, copy, readonly) NSString *affilID;


- (NSDictionary<NSString *, NSObject *> *)initialProperties;

@end

NS_ASSUME_NONNULL_END
