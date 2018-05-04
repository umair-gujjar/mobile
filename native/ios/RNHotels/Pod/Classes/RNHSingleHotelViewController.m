#import "RNHSingleHotelViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBridgeDelegate.h>
#import <React/RCTBridge.h>

@interface RNHSingleHotelViewController () <RCTBridgeDelegate>
@end

@implementation RNHSingleHotelViewController

- (void)loadView
{
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:@{}];
    self.view = [[RCTRootView alloc] initWithBridge:bridge
                                         moduleName:@"SingleHotel"
                                  initialProperties:  @{
                                                        @"hotelId" : @"aG90ZWw6MjQzNTE2Ng==",
                                                        @"checkin": @"2018-10-05",
                                                        @"checkout": @"2018-10-10",
                                                        @"roomsConfiguration": @[@{@"adultsCount": @(1), @"children": @[]}],
                                                        @"language": @"en",
                                                        @"currency": @"EUR",
                                                        }];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    NSBundle *hotelsBundle = [NSBundle bundleForClass:RNHSingleHotelViewController.class];
    return [hotelsBundle URLForResource:@"RNHotels" withExtension:@"js"];
}

@end
