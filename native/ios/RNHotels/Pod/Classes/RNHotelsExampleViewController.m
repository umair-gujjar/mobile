#import "RNHotelsExampleViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBridgeDelegate.h>
#import <React/RCTBridge.h>

@interface RNHotelsExampleViewController () <RCTBridgeDelegate>
@end

@implementation RNHotelsExampleViewController

- (void)loadView
{
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:@{}];
    self.view = [[RCTRootView alloc] initWithBridge:bridge
                                         moduleName:@"KiwiHotels"
                                  initialProperties:  @{
                                                        @"coordinates" :
                                                            @{
                                                                @"latitude" : @59.9139,
                                                                @"longitude": @10.7522
                                                                },
                                                        @"language": @"en",
                                                        @"currency": @"EUR"
                                                        }];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    NSBundle *hotelsBundle = [NSBundle bundleForClass:RNHotelsExampleViewController.class];
    return [hotelsBundle URLForResource:@"RNHotels" withExtension:@"js"];
}

@end
